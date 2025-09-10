import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:calculadora_imc/main.dart';

void main() {
  testWidgets('Calculadora IMC widget test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that the app starts with the correct title
    expect(find.text('Calculadora de IMC'), findsOneWidget);
    
    // Verify that the gender selection is present
    expect(find.text('Gênero:'), findsOneWidget);
    expect(find.text('Masculino'), findsOneWidget);
    expect(find.text('Feminino'), findsOneWidget);
    
    // Verify that input fields are present
    expect(find.byType(TextFormField), findsNWidgets(2));
    
    // Verify that the calculate button is present
    expect(find.text('Calcular'), findsOneWidget);
  });

  testWidgets('IMC calculation test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Enter weight
    await tester.enterText(find.byType(TextFormField).at(0), '70');
    
    // Enter height
    await tester.enterText(find.byType(TextFormField).at(1), '1.75');
    
    // Tap the calculate button
    await tester.tap(find.text('Calcular'));
    await tester.pump();

    // Verify that IMC result is displayed
    expect(find.text('Seu IMC é:'), findsOneWidget);
    
    // The IMC for 70kg and 1.75m should be approximately 22.9
    expect(find.textContaining('22.9'), findsOneWidget);
  });

  testWidgets('Input validation test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Try to calculate without entering values
    await tester.tap(find.text('Calcular'));
    await tester.pump();

    // Should show validation errors
    expect(find.text('Por favor, informe peso'), findsOneWidget);
    expect(find.text('Por favor, informe altura'), findsOneWidget);
  });
}