package fr.adoptunstage.spring.services;


import fr.adoptunstage.spring.models.College;
import fr.adoptunstage.spring.repos.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CollegeService {

    @Autowired
    CollegeRepository repository;

    public Set<College> getAllColleges() {
        Set<College> colleges = new HashSet<College>();
        repository.findAll().forEach(colleges::add);
        return colleges;
    }

}
