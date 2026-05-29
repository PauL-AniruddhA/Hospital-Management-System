package in.hms.backend.data_transfer_object.doctor;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorResponse {
     private Long id;

    // USER fields
    private String name;
    private String email;
    private String phone;

    // DOCTOR fields
    private String specialization;
    private int experience;
    private String department;
}
