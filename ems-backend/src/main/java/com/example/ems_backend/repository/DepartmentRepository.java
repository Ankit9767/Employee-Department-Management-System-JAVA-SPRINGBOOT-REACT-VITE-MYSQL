package com.example.ems_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ems_backend.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}