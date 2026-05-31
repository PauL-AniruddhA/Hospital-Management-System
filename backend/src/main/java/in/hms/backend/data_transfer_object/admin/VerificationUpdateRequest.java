package in.hms.backend.data_transfer_object.admin;

import in.hms.backend.enums.Verification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerificationUpdateRequest {
    
    private Verification verification;

}
