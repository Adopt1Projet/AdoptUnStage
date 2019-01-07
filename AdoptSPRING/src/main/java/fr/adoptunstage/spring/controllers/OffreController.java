package fr.adoptunstage.spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.services.OffreService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OffreController{

	@Autowired
	OffreService service;

	@GetMapping("/offre")
	public List<Offre> getAllOffres() {
		return service.getAllOffres();
	}

	@PostMapping(value = "/offre/creer")
	public Offre postEntreprise(@RequestBody Offre offre) {
		return service.postEntreprise(offre);
	}

	@DeleteMapping("/offre/deleteOne")
	public ResponseEntity<String> deleteOffre(long id) {
		return service.deleteOffre(id);
	}
	
	@DeleteMapping("/offre/supprimer")
	public ResponseEntity<String> deleteAll() {
		System.out.println("Delete All Customers...");
 
		return service.deleteAll();
 
	}

	@PutMapping("/offre/{id}")
	public ResponseEntity<Offre> updateOffre(@PathVariable("id") long id, @RequestBody Offre offre) {
		System.out.println("Update Customer with ID = " + id + "...");

		return service.updateOffre(id, offre);
	}
	
//	@PutMapping("/customers/{id}")
//	public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id, @RequestBody Customer customer) {
//		System.out.println("Update Customer with ID = " + id + "...");
//
//		Optional<Customer> customerData = repository.findById(id);
//
//		if (customerData.isPresent()) {
//			Customer _customer = customerData.get();
//			_customer.setName(customer.getName());
//			_customer.setAge(customer.getAge());
//			_customer.setActive(customer.isActive());
//			return new ResponseEntity<>(repository.save(_customer), HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}
}
