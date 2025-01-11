package com.ems.service;

import com.ems.entity.Attendance;

import java.util.List;

public interface AttendanceService {
    Attendance saveAttendance(Attendance attendance);
    void updateAttendance(Attendance attendance);
    Attendance getAttendanceById(Long id);
    List<Attendance> getAllAttendances();
    void deleteAttendanceById(Long id);
}
