package in.hms.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.hms.backend.entity.Doctor;
import in.hms.backend.entity.User;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Long>{
    Optional<Doctor> findByUser(User user);
}
