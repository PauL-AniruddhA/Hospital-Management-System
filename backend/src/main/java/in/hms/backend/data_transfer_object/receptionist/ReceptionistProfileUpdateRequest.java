package in.hms.backend.data_transfer_object.receptionist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReceptionistProfileUpdateRequest {
    private String shift;
}
