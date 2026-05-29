package in.hms.backend.data_transfer_object.user;

import in.hms.backend.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private Role role;
}
