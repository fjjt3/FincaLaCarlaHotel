package com.example.datedemo.interfaces;

import com.example.datedemo.domain.Reservation;
import com.example.datedemo.domain.ReservationService;
import com.example.datedemo.domain.ReservationStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createReservation_shouldReturn200() throws Exception {
        String json = """
                {
                    "customerName": "Integration Test",
                    "customerEmail": "integration@email.com",
                    "roomType": "SINGLE",
                    "checkInDate": "2027-06-01",
                    "checkOutDate": "2027-06-05"
                }
                """;

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName").value("Integration Test"))
                .andExpect(jsonPath("$.status").value("ACTIVE"))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    void getAllReservations_shouldReturnList() throws Exception {
        mockMvc.perform(get("/api/reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").isNumber());
    }

    @Test
    void cancelReservation_shouldReturn404_whenNotFound() throws Exception {
        mockMvc.perform(patch("/api/reservations/9999/cancel"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Reservation not found with id: 9999"));
    }

    @Test
    void createReservation_shouldReturn409_whenConflict() throws Exception {
        // First, create a reservation
        String json = """
                {
                    "customerName": "Conflict Test",
                    "customerEmail": "conflict@email.com",
                    "roomType": "CONFLICT_TEST_ROOM",
                    "checkInDate": "2027-07-01",
                    "checkOutDate": "2027-07-05"
                }
                """;

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());

        // Then try to create an overlapping one
        String conflictJson = """
                {
                    "customerName": "Conflict User",
                    "customerEmail": "conflict2@email.com",
                    "roomType": "CONFLICT_TEST_ROOM",
                    "checkInDate": "2027-07-03",
                    "checkOutDate": "2027-07-07"
                }
                """;

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(conflictJson))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Room is not available for the selected dates"));
    }
}
