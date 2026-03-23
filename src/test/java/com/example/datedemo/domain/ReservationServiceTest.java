package com.example.datedemo.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Reservation sampleReservation;

    @BeforeEach
    void setUp() {
        sampleReservation = new Reservation(
                1L, "Carlos García", "carlos@email.com", "DOUBLE",
                new Date(126, 3, 1), // 2026-04-01
                new Date(126, 3, 5), // 2026-04-05
                ReservationStatus.ACTIVE);
    }

    @Test
    void createReservation_shouldSucceed_whenNoOverlap() {
        Reservation newReservation = new Reservation(
                null, "Test User", "test@email.com", "SINGLE",
                new Date(126, 5, 1), new Date(126, 5, 5), ReservationStatus.ACTIVE);

        when(reservationRepository.findOverlappingReservations(anyString(), any(), any()))
                .thenReturn(Collections.emptyList());
        when(reservationRepository.save(any())).thenReturn(
                new Reservation(2L, "Test User", "test@email.com", "SINGLE",
                        new Date(126, 5, 1), new Date(126, 5, 5), ReservationStatus.ACTIVE));

        Reservation result = reservationService.createReservation(newReservation);

        assertNotNull(result.id());
        assertEquals("Test User", result.customerName());
        verify(reservationRepository).save(any());
    }

    @Test
    void createReservation_shouldThrow_whenOverlapExists() {
        Reservation newReservation = new Reservation(
                null, "Test", "t@e.com", "DOUBLE",
                new Date(126, 3, 2), new Date(126, 3, 4), ReservationStatus.ACTIVE);

        when(reservationRepository.findOverlappingReservations(anyString(), any(), any()))
                .thenReturn(List.of(sampleReservation));

        assertThrows(IllegalStateException.class,
                () -> reservationService.createReservation(newReservation));
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void cancelReservation_shouldSetStatusCancelled() {
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(sampleReservation));
        when(reservationRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Reservation result = reservationService.cancelReservation(1L);

        assertEquals(ReservationStatus.CANCELLED, result.status());
        verify(reservationRepository).save(any());
    }

    @Test
    void cancelReservation_shouldThrow_whenNotFound() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ReservationNotFoundException.class,
                () -> reservationService.cancelReservation(99L));
    }

    @Test
    void cancelReservation_shouldThrow_whenAlreadyCancelled() {
        Reservation cancelled = new Reservation(
                1L, "Carlos", "carlos@email.com", "DOUBLE",
                new Date(126, 3, 1), new Date(126, 3, 5), ReservationStatus.CANCELLED);
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(cancelled));

        assertThrows(IllegalStateException.class,
                () -> reservationService.cancelReservation(1L));
    }

    @Test
    void updateReservation_shouldSucceed_whenValid() {
        Reservation updated = new Reservation(
                1L, "Carlos Updated", "carlos@email.com", "DOUBLE",
                new Date(126, 3, 10), new Date(126, 3, 15), ReservationStatus.ACTIVE);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(sampleReservation));
        when(reservationRepository.findOverlappingReservations(anyString(), any(), any()))
                .thenReturn(Collections.emptyList());
        when(reservationRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Reservation result = reservationService.updateReservation(1L, updated);

        assertEquals("Carlos Updated", result.customerName());
        verify(reservationRepository).save(any());
    }

    @Test
    void updateReservation_shouldThrow_whenCancelled() {
        Reservation cancelled = new Reservation(
                1L, "Carlos", "carlos@email.com", "DOUBLE",
                new Date(126, 3, 1), new Date(126, 3, 5), ReservationStatus.CANCELLED);
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(cancelled));

        Reservation updated = new Reservation(
                1L, "NewName", "new@email.com", "DOUBLE",
                new Date(126, 3, 10), new Date(126, 3, 15), ReservationStatus.ACTIVE);

        assertThrows(IllegalStateException.class,
                () -> reservationService.updateReservation(1L, updated));
    }

    @Test
    void getAllReservations_shouldReturnList() {
        when(reservationRepository.findAll()).thenReturn(List.of(sampleReservation));

        List<Reservation> result = reservationService.getAllReservations();

        assertEquals(1, result.size());
        assertEquals("Carlos García", result.get(0).customerName());
    }
}
