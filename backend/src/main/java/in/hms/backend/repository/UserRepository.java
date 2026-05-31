package in.hms.backend.repository;

import in.hms.backend.entity.User;
import in.hms.backend.enums.Verification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    List<User> findByVerification(Verification verification);
}