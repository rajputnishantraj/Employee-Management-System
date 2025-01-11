package com.ems.controller;

import com.ems.entity.Attendance;
import com.ems.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendances")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        try {
            Attendance newAttendance = attendanceService.saveAttendance(attendance);
            return new ResponseEntity<>(newAttendance, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating attendance: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        try {
            attendance.setAttendanceId(id);
            attendanceService.updateAttendance(attendance);
            return new ResponseEntity<>(attendance, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error updating attendance: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Long id) {
        try {
            Attendance attendance = attendanceService.getAttendanceById(id);
            if (attendance != null) {
                return ResponseEntity.ok(attendance);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Invalid attendance ID: " + id);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        List<Attendance> attendances = attendanceService.getAllAttendances();
        return ResponseEntity.ok(attendances);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAttendanceById(@PathVariable Long id) {
        try {
            attendanceService.deleteAttendanceById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error deleting attendance: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
