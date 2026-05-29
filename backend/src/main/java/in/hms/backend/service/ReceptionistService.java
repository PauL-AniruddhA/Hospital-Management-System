package in.hms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import in.hms.backend.data_transfer_object.receptionist.ReceptionistProfileUpdateRequest;
import in.hms.backend.data_transfer_object.receptionist.ReceptionistResponse;
import in.hms.backend.entity.Receptionist;
import in.hms.backend.entity.User;
import in.hms.backend.repository.ReceptionistRepository;
import in.hms.backend.repository.UserRepository;

@Service
public class ReceptionistService {
    @Autowired
    private ReceptionistRepository receptionistRepository;
    @Autowired
    private UserRepository userRepository;

    // Get current Login-Receptionist
    public ReceptionistResponse getCurrentReceptionist(){
        return mapToResponse(getAuthenticatedReceptionist());
    }
    //Get All Receptionist
    public List<ReceptionistResponse> getAllReceptionists(){
        List<Receptionist> receptionists = receptionistRepository.findAll();
        return receptionists.stream().map(this::mapToResponse).collect(Collectors.toList());
    }
    // Get Receptionist by Id
    public ReceptionistResponse getReceptionistById(Long id){
        Receptionist receptionist = receptionistRepository.findById(id).orElseThrow(()-> new RuntimeException("Receptionist Not Found !! "));
        return mapToResponse(receptionist);
    }
    // Update Receptionist
    public ReceptionistResponse updateMyProfile(ReceptionistProfileUpdateRequest request){
        Receptionist receptionist = getAuthenticatedReceptionist();
        receptionist.setShift(request.getShift());
        Receptionist updateReceptionist = receptionistRepository.save(receptionist);
        return mapToResponse(updateReceptionist);
    }

    // helper fn
    private Receptionist getAuthenticatedReceptionist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found")); 
        return receptionistRepository.findByUser(user).orElseThrow(()->new RuntimeException("Receptionist Not Found"));

    }
    // mapping
    private ReceptionistResponse mapToResponse(Receptionist receptionist){
        return ReceptionistResponse.builder()
            .id(receptionist.getId())
            //user Data
            .name(receptionist.getUser().getName())
            .email(receptionist.getUser().getEmail())
            .phone(receptionist.getUser().getPhone())
            // Receptionist data
            .shift(receptionist.getShift())
        .build();
    }
}
