package in.hms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import in.hms.backend.data_transfer_object.patient.PatientProfileUpdateRequest;
import in.hms.backend.data_transfer_object.patient.PatientResponce;
import in.hms.backend.entity.Patient;
import in.hms.backend.entity.User;
import in.hms.backend.repository.PatientRepository;
import in.hms.backend.repository.UserRepository;

@Service
public class PatientService {

    @Autowired // automatically creates "PatientRepository repo = new PatientRepository();" 
    private PatientRepository patientRepository;
    @Autowired
    private UserRepository userRepository;

    // Get current Login-Patient
    public PatientResponce getCurrentPatient(){
        return mapToResponce(getAuthenticatedPatient());
    }

    // Get All Patient 
    public List<PatientResponce> getAllPatients(){
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map(this::mapToResponce).collect(Collectors.toList());
    }
    // Get Patient by ID
    public PatientResponce getPatientById(Long id){
        Patient patient = patientRepository.findById(id).orElseThrow(() ->new RuntimeException("Patient not found"));
        return mapToResponce(patient);
    }
    // Update profile
    public PatientResponce updateMyProfile(PatientProfileUpdateRequest request){
        
        Patient patient = getAuthenticatedPatient(); // helper class for authentication
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setAddress(request.getAddress());
        patient.setDisease(request.getDisease());
        
        Patient updatedPatient = patientRepository.save(patient);
        return mapToResponce(updatedPatient);
    }
    
    // Reused function . Usecase -{Returns the currently logged-in patient}
    private Patient getAuthenticatedPatient(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //Get Authentication Object
        String email = authentication.getName(); // Extract logged-in email
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found")); // Find authenticated user
        return patientRepository.findByUser(user).orElseThrow(()->new RuntimeException("Patient Not Found"));
    } 
    // mapping
    private PatientResponce mapToResponce(Patient patient){
        return PatientResponce.builder()
            .id(patient.getId())

            // USER DATA
            .name(patient.getUser().getName())
            .email(patient.getUser().getEmail())
            .phone(patient.getUser().getPhone())

            // PATIENT DATA
            .age(patient.getAge())
            .gender(patient.getGender())
            .address(patient.getAddress())
            .disease(patient.getDisease())

        .build();
    }
}
