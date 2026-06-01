package in.hms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import in.hms.backend.data_transfer_object.user.LoginRequest;
import in.hms.backend.data_transfer_object.user.LoginResponse;
import in.hms.backend.data_transfer_object.user.SignupRequest;
import in.hms.backend.service.UserService;


@RestController // This class handels the REST APIs
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // PATIENT SIGNUP API
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        return userService.signup(request);
    }

    // PATIENT + STAFF LOGIN API
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    // STAFF SIGNUP
    @PostMapping("/staff/signup")
    public String staffSignup(@RequestBody SignupRequest request) {
        return userService.staffSignup(request);
    }
    
    // GET ALL USERS PROFILE
    @GetMapping("/profile")
    public String profile(Authentication authentication) {

        return "Welcome " + authentication.getName();
    }
}