package Project.winery.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Project.winery.model.Winery;
import Project.winery.service.WineryService;
import Project.winery.support.WineryToWineryDto;
import Project.winery.web.dto.WineryDTO;

@RestController
@RequestMapping(value = "/api/wineries", produces = MediaType.APPLICATION_JSON_VALUE)
public class WineryController {
	
	@Autowired
	private WineryService wineryService;
	
	@Autowired
	private WineryToWineryDto toWineryDto;
	
	@GetMapping
	public ResponseEntity<List<WineryDTO>> getAll(){
		List<Winery> wineries = wineryService.findAll();
		
		if(wineries != null) {
			return new ResponseEntity<>(toWineryDto.convert(wineries), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
