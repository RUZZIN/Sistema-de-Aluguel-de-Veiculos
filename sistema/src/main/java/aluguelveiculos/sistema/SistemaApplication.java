package aluguelveiculos.sistema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(info = @Info(
        title = "API Rest Full Sistema de Aluguel de Veículos",
        version = "1.0",
        description = "Sistema de Aluguel de Veículos\n"
        		+ "Contatos",
        contact = @Contact(name = "Ruan", email = "ruanp9725@gmail.ocm"))
)

@SpringBootApplication
public class SistemaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaApplication.class, args);
	}

}
