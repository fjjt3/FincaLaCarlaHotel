package com.example.datedemo.infrastructure;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import com.example.datedemo.domain.ReservationStatus;
import java.util.Date;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private String roomType;

    @Temporal(TemporalType.DATE)
    private Date checkInDate;

    @Temporal(TemporalType.DATE)
    private Date checkOutDate;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.ACTIVE;
}
