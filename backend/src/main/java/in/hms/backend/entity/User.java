package in.hms.backend.entity;

import in.hms.backend.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
// " @ToString(exclude = "password") " this lombok shortcut acts same as the last function toString 

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;
    
    private String phone;
    
    private String password;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Override 
    public String toString() {
        return "User{" +"id=" + id +", name='" + name + '\'' +", email='" + email + '\'' +", role='" + role + '\'' +'}';
    }
}
