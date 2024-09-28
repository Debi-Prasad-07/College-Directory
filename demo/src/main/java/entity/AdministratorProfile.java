package entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "administrator_profiles")
@Getter
@Setter
public class AdministratorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String photo;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}

