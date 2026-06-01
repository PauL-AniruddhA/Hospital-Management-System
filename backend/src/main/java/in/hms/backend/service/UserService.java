package in.hms.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import in.hms.backend.data_transfer_object.user.LoginRequest;
import in.hms.backend.data_transfer_object.user.LoginResponse;
import in.hms.backend.data_transfer_object.user.SignupRequest;
import in.hms.backend.entity.Doctor;
import in.hms.backend.entity.Patient;
import in.hms.backend.entity.Receptionist;
import in.hms.backend.entity.User;
import in.hms.backend.enums.Role;
import in.hms.backend.enums.Verification;
import in.hms.backend.repository.DoctorRepository;
import in.hms.backend.repository.PatientRepository;
import in.hms.backend.repository.ReceptionistRepository;
import in.hms.backend.repository.UserRepository;
import in.hms.backend.security.JwtUtil;

@Service
public class UserService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private ReceptionistRepository receptionistRepository;

    // PATIENT signup 
    public String signup(SignupRequest request){

        // Check if email already exists
        if(userRepository.findByEmail(request.getEmail()).isPresent()) return "Email already exist!";
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(Role.PATIENT);
        user.setVerification(Verification.APPROVED);
        user.setActive(true);
        User savedUserP = userRepository.save(user);
        // Since the Role is Patient 
        Patient patient = new Patient(); // Patient Object Created 
        patient.setUser(savedUserP);
        patientRepository.save(patient);

        return "Congrats !! Patient Registered Successfully !!";
    }
    
    // STAFF Signup
    public String staffSignup(SignupRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) return "Email already exist!";
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setVerification(Verification.PENDING);
        user.setActive(false);
        User savedUser = userRepository.save(user); // saved User in the database
        // If Role is Doctor
        if(savedUser.getRole()==Role.DOCTOR) {
            Doctor doctor = new Doctor(); // Doctor Object Created
            doctor.setUser(savedUser);
            doctor.setSpecialization("");
            doctor.setExperience(0);
            doctor.setDepartment("");
            doctorRepository.save(doctor);
        }
        // If Role is Receptionist
        if(savedUser.getRole()==Role.RECEPTIONIST){
            Receptionist receptionist = new Receptionist(); // Receptionist Object Created i.e table
            receptionist.setUser(savedUser);
            receptionistRepository.save(receptionist);
        }

        return "Staff Registered Successfully";
    }

    // PATIENT + STAFF Login
    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if(user==null) return null;

        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())) return null;
        if(user.getVerification()!=Verification.APPROVED) throw new RuntimeException("Account verification pending");
        if(!user.getActive()) throw new RuntimeException("Account inactive");
        String token = jwtUtil.generateToken(user.getEmail(),user.getRole().name());
        return new LoginResponse(token, user.getRole().name());
    }
    
}

