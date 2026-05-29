package in.hms.backend.data_transfer_object.patient;

import lombok.*;

@Getter
@Setter
@Builder
public class PatientResponce {
     private Long id;

    // USER DATA
    private String name;
    private String email;
    private String phone;

    // PATIENT DATA
    private int age;
    private String gender;
    private String address;
    private String disease;
}
