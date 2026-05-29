package in.hms.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.hms.backend.entity.Receptionist;
import in.hms.backend.entity.User;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist,Long>{
    Optional<Receptionist> findByUser(User user);
}
