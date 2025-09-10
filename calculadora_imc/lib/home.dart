import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  // Variables moved to State class (Fix #1)
  String masculinoOuFeminino = 'masculino';
  double peso = 0.0;
  double altura = 0.0;
  
  // TextEditingControllers for proper input management (Fix #2)
  final TextEditingController _pesoController = TextEditingController();
  final TextEditingController _alturaController = TextEditingController();
  
  // GlobalKey for form validation
  final _formKey = GlobalKey<FormState>();
  
  // Result variables
  double _imc = 0.0;
  String _resultado = '';
  
  @override
  void dispose() {
    // Clean up controllers
    _pesoController.dispose();
    _alturaController.dispose();
    super.dispose();
  }

  // IMC calculation logic (Fix #3)
  void _calcularIMC() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        peso = double.tryParse(_pesoController.text.replaceAll(',', '.')) ?? 0.0;
        altura = double.tryParse(_alturaController.text.replaceAll(',', '.')) ?? 0.0;
        
        if (peso > 0 && altura > 0) {
          _imc = peso / (altura * altura);
          _resultado = _interpretarIMC(_imc);
        }
      });
    }
  }
  
  // IMC interpretation
  String _interpretarIMC(double imc) {
    if (imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc < 25) {
      return 'Peso normal';
    } else if (imc < 30) {
      return 'Sobrepeso';
    } else if (imc < 35) {
      return 'Obesidade grau I';
    } else if (imc < 40) {
      return 'Obesidade grau II';
    } else {
      return 'Obesidade grau III';
    }
  }
  
  // Input validation (Fix #4)
  String? _validarNumero(String? value, String campo) {
    if (value == null || value.isEmpty) {
      return 'Por favor, informe $campo';
    }
    
    String normalizedValue = value.replaceAll(',', '.');
    double? numero = double.tryParse(normalizedValue);
    
    if (numero == null) {
      return 'Por favor, informe um número válido';
    }
    
    if (campo == 'peso' && (numero <= 0 || numero > 500)) {
      return 'Peso deve estar entre 1 e 500 kg';
    }
    
    if (campo == 'altura' && (numero <= 0 || numero > 3.0)) {
      return 'Altura deve estar entre 0.1 and 3.0 metros';
    }
    
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Calculadora de IMC'),
        centerTitle: true,
      ),
      body: Container(
        // Improved UI with better spacing (Fix #5)
        padding: const EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Gender selection
              const Text(
                'Gênero:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: RadioListTile<String>(
                      title: const Text('Masculino'),
                      value: 'masculino',
                      groupValue: masculinoOuFeminino,
                      onChanged: (String? value) {
                        setState(() {
                          masculinoOuFeminino = value!;
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: RadioListTile<String>(
                      title: const Text('Feminino'),
                      value: 'feminino',
                      groupValue: masculinoOuFeminino,
                      onChanged: (String? value) {
                        setState(() {
                          masculinoOuFeminino = value!;
                        });
                      },
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 20),
              
              // Weight input
              TextFormField(
                controller: _pesoController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Peso (kg)',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.fitness_center),
                ),
                validator: (value) => _validarNumero(value, 'peso'),
              ),
              
              const SizedBox(height: 16),
              
              // Height input
              TextFormField(
                controller: _alturaController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Altura (m)',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.height),
                  helperText: 'Ex: 1.75',
                ),
                validator: (value) => _validarNumero(value, 'altura'),
              ),
              
              const SizedBox(height: 24),
              
              // Calculate button
              ElevatedButton(
                onPressed: _calcularIMC,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'Calcular',
                  style: TextStyle(fontSize: 18),
                ),
              ),
              
              const SizedBox(height: 24),
              
              // Result display
              if (_imc > 0) ...[
                Card(
                  elevation: 4,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Text(
                          'Seu IMC é:',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.grey[600],
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _imc.toStringAsFixed(1),
                          style: const TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: Colors.deepPurple,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _resultado,
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                            color: _getResultColor(),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                _buildIMCTable(),
              ],
            ],
          ),
        ),
      ),
    );
  }
  
  // Helper method to get result color based on IMC
  Color _getResultColor() {
    if (_imc < 18.5) return Colors.blue;
    if (_imc < 25) return Colors.green;
    if (_imc < 30) return Colors.orange;
    return Colors.red;
  }
  
  // IMC reference table
  Widget _buildIMCTable() {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Tabela de Referência IMC:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 8),
            _buildIMCRow('Abaixo do peso', '< 18,5', Colors.blue),
            _buildIMCRow('Peso normal', '18,5 - 24,9', Colors.green),
            _buildIMCRow('Sobrepeso', '25,0 - 29,9', Colors.orange),
            _buildIMCRow('Obesidade I', '30,0 - 34,9', Colors.red[300]!),
            _buildIMCRow('Obesidade II', '35,0 - 39,9', Colors.red[600]!),
            _buildIMCRow('Obesidade III', '≥ 40,0', Colors.red[900]!),
          ],
        ),
      ),
    );
  }
  
  Widget _buildIMCRow(String categoria, String faixa, Color cor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(
              color: cor,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(child: Text(categoria)),
          Text(
            faixa,
            style: const TextStyle(fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}