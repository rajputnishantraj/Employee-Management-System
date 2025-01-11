package com.ems.serviceImpl;

import com.ems.entity.Attendance;
import com.ems.repository.AttendanceRepository;
import com.ems.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    public void updateAttendance(Attendance attendance) {
        Optional<Attendance> attendanceOpt = attendanceRepository.findById(attendance.getAttendanceId());
        if (attendanceOpt.isPresent()) {
            Attendance existingAttendance = attendanceOpt.get();
            existingAttendance.setCheckInTime(attendance.getCheckInTime());
            existingAttendance.setCheckOutTime(attendance.getCheckOutTime());
            attendanceRepository.save(existingAttendance);
        }
    }

    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    @Override
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    @Override
    public void deleteAttendanceById(Long id) {
        attendanceRepository.deleteById(id);
    }
}
