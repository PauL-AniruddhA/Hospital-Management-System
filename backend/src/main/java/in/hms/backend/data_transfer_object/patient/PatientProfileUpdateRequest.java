package in.hms.backend.data_transfer_object.patient;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientProfileUpdateRequest {
    private int age;
    private String gender;
    private String address;
    private String disease;
}
