package in.hms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import in.hms.backend.data_transfer_object.doctor.DoctorProfileUpdateRequest;
import in.hms.backend.data_transfer_object.doctor.DoctorResponse;
import in.hms.backend.entity.Doctor;
import in.hms.backend.entity.User;
import in.hms.backend.repository.DoctorRepository;
import in.hms.backend.repository.UserRepository;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserRepository userRepository;

    // GET CURRENT LOGGED_IN_DOCTOR
    private Doctor getAuthenticatedPatient(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //Get Authentication Object
        String email = authentication.getName(); // Extract logged-in email
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found")); // Find authenticated user
        return doctorRepository.findByUser(user).orElseThrow(() ->new RuntimeException("Doctor not found")); // Find doctor linked with user
    }
    public DoctorResponse getCurrentDoctor(){
        return mapToResponse(getAuthenticatedPatient()); // Convert entity -> DTO
    }
    
    // GET ALL DOCTOR
    public List<DoctorResponse> getAllDoctors(){
        List<Doctor> doctors = doctorRepository.findAll();

        return doctors.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // GET DOCTOR by ID
    public DoctorResponse getDoctorById(Long id){
        
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() ->new RuntimeException("Doctor not found"));
        return mapToResponse(doctor);
    }

    // DELETE DOCTOR
    public String deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
        return "Doctor Successfully deleted !";
    }
    // UPDATE DOCTORS PROFILE 
    public DoctorResponse updateMyProfile(DoctorProfileUpdateRequest request){
        Doctor doctor = getAuthenticatedPatient();
        
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperience(request.getExperience());
        doctor.setDepartment(request.getDepartment());
        
        Doctor updatedDoctor = doctorRepository.save(doctor);
        return mapToResponse(updatedDoctor);
    }
    // helper
    

    // Doctor's Entity - Data Transfer Object mapping method
    private DoctorResponse mapToResponse(Doctor doctor){
        return DoctorResponse.builder().id(doctor.getId())
            // USER DATA
            .name(doctor.getUser().getName())
            .email(doctor.getUser().getEmail())
            .phone(doctor.getUser().getPhone())

            // DOCTOR DATA
            .specialization(doctor.getSpecialization())
            .experience(doctor.getExperience())
            .department(doctor.getDepartment())
        .build();
    }

}

