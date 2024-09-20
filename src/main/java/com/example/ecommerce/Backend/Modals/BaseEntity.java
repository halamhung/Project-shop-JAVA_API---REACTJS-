package com.example.ecommerce.Backend.Modals;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class BaseEntity {
    @CreationTimestamp
    @Column(name = "create_at",updatable = false)
    private LocalDate createAt;
    @UpdateTimestamp
    @Column(name = "update_at")
    private LocalDate updateAt;
}
