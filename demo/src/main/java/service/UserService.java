package service;

import entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private Repository userRepository;

    public Optional<User> findByUsername(String username) {
        return Repository.findByUsername(username);
    }

    public User saveUser(User user) {
        return Repository.save(user);
    }
}
