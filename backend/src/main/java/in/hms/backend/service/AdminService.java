package in.hms.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.hms.backend.data_transfer_object.admin.UserVerificationResponse;
import in.hms.backend.entity.User;
import in.hms.backend.enums.Verification;
import in.hms.backend.repository.UserRepository;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;
    // PENDING STAFF
   public List<UserVerificationResponse> getStaffByVerification(Verification verification) {

    List<User> users =userRepository.findByVerification(verification);
    return users.stream().map(UserVerificationResponse::new).toList();
}
    // UPDATE VERIFICATION STATUS
    public String updateVerification(Long userId,Verification verification) {
        User user = userRepository.findById(userId).orElseThrow(() ->new RuntimeException("User not found"));
        user.setVerification(verification);

        if (verification == Verification.APPROVED) {
            user.setActive(true);
        } else {
            user.setActive(false);
        }

        userRepository.save(user);

        return "Verification Updated Successfully";
    }
}
