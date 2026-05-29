package in.hms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import in.hms.backend.data_transfer_object.receptionist.ReceptionistProfileUpdateRequest;
import in.hms.backend.data_transfer_object.receptionist.ReceptionistResponse;
import in.hms.backend.service.ReceptionistService;

@RestController
@RequestMapping("/api/receptionist")
public class ReceptionistController {
    @Autowired
    private ReceptionistService receptionistService;
    
    // GET CURRENT LOGGED-IN RECEPTIONIST
    @GetMapping("/me")
    public ReceptionistResponse getCurrentReceptionist(){
        return receptionistService.getCurrentReceptionist();
    }
    // GET ALL RECEPTIONIST
    @GetMapping("/all")
    public List<ReceptionistResponse> getAllReceptionist(){
        return receptionistService.getAllReceptionists();
    }
    // GET RECEPTIONIST BY ID
    @GetMapping("/{id}")
    public ReceptionistResponse getReceptionistId(@PathVariable Long id){
        return receptionistService.getReceptionistById(id);
    }
    // UPDATE RECEPTIONIST PROFILE
    @PutMapping("/updateprofile")
    public ReceptionistResponse updateProfile(@RequestBody ReceptionistProfileUpdateRequest request){
        return receptionistService.updateMyProfile(request);
    }
}
