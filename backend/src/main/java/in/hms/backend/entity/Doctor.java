package in.hms.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "doctors")
@ToString(exclude = "user")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialization;
    private int experience;
    private String department;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}