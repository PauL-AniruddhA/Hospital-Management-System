package in.hms.backend.data_transfer_object.admin;

import in.hms.backend.entity.User;
import in.hms.backend.enums.Role;
import in.hms.backend.enums.Verification;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserVerificationResponse {
    
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private Verification verification;
    // Parameterised Constructor
    public UserVerificationResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.role = user.getRole();
        this.verification = user.getVerification();
    }
}
