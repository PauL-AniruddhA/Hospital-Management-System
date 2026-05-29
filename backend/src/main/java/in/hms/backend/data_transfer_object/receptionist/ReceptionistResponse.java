package in.hms.backend.data_transfer_object.receptionist;

import lombok.*;

@Getter
@Setter
@Builder
public class ReceptionistResponse {
    private Long id;
    // User Part
    private String name;
    private String email;
    private String phone;
    // Receptionist Part
    private String shift;
}
