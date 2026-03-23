package com.example.datedemo.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface JpaReservationRepository extends JpaRepository<ReservationEntity, Long> {

        @Query("SELECT r FROM ReservationEntity r WHERE r.roomType = :roomType AND " +
                        "r.status = 'ACTIVE' AND (r.checkInDate < :checkOut AND r.checkOutDate > :checkIn)")
        List<ReservationEntity> findOverlapping(@Param("roomType") String roomType,
                        @Param("checkIn") Date checkIn,
                        @Param("checkOut") Date checkOut);
}
