package in.hms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import in.hms.backend.data_transfer_object.patient.PatientProfileUpdateRequest;
import in.hms.backend.data_transfer_object.patient.PatientResponce;
import in.hms.backend.service.PatientService;

@RestController // tells Spring that this class handles APIs
@RequestMapping("/api/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;

    // GET CURRENT LOGGED-IN PATIENT
    @GetMapping("/me")
    public PatientResponce getCurrentPatient(){
        return patientService.getCurrentPatient();
    }

    // GET ALL PATIENTS
    @GetMapping("/all")
    public List<PatientResponce> getAllPatients(){
        return patientService.getAllPatients();
    }

    // GET PATIENT BY ID
    @GetMapping("/{id}")
    public PatientResponce getPatientById(
            @PathVariable Long id){

        return patientService.getPatientById(id);
    }

    // UPDATE PATIENT PROFILE
    @PutMapping("/updateprofile")
    public PatientResponce updateProfile(
            @RequestBody PatientProfileUpdateRequest request){

        return patientService.updateMyProfile(request);
    }

}
