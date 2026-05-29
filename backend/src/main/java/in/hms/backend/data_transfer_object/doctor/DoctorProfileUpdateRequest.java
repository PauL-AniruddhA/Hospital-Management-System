package in.hms.backend.data_transfer_object.doctor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorProfileUpdateRequest {

    private String specialization;
    private int experience;
    private String department;
}
