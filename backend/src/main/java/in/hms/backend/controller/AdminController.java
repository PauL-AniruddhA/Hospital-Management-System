package in.hms.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.hms.backend.data_transfer_object.admin.UserVerificationResponse;
import in.hms.backend.data_transfer_object.admin.VerificationUpdateRequest;
import in.hms.backend.enums.Verification;
import in.hms.backend.service.AdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
   
    @GetMapping("/dashboard")
    public String dashboard() {
        return "Welcome Admin";
    }

    @GetMapping("/staff")
    public List<UserVerificationResponse> getStaffByVerification(@RequestParam Verification verification) {

        return adminService.getStaffByVerification(verification);
    }

    @PutMapping("/staff/{id}/verification")
    public String updateVerification(@PathVariable Long id,@RequestBody VerificationUpdateRequest request) {

        return adminService.updateVerification(id,request.getVerification());
    }
}
