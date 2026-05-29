package in.hms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import in.hms.backend.data_transfer_object.doctor.DoctorProfileUpdateRequest;
import in.hms.backend.data_transfer_object.doctor.DoctorResponse;
import in.hms.backend.service.DoctorService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController 
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // GET CURRENT LOGGED-IN DOCTOR
    @GetMapping("/me")
    public DoctorResponse getCurrentDoctor(){
        return doctorService.getCurrentDoctor();
    }

    // Get All Doctors API
    @GetMapping("/all")
    public List<DoctorResponse> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Get Doctor By ID API
    @GetMapping("/{id}")
    public DoctorResponse getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    // Delete Doctor API
    @DeleteMapping("/delete/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        return doctorService.deleteDoctor(id);
    }

    // UPDATE DOCTOR PROFILE
    @PutMapping("/updateprofile")
    public DoctorResponse putMethodName(@RequestBody DoctorProfileUpdateRequest request) {
        return doctorService.updateMyProfile(request);
    }
}
