package aluguelveiculos.sistema.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import aluguelveiculos.sistema.model.Aluguel;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
    List<Aluguel> findByVeiculoDisponivel(boolean disponivel);
    
}
