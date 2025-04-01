import { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const SalaryCalculator = () => {
  // Стан для введених даних
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hourlyRate, setHourlyRate] = useState("12.5");
  const [exchangeRate, setExchangeRate] = useState("40");
  const [result, setResult] = useState(null);

  // Функція для розрахунку зарплати
  const calculateSalary = () => {
    // Переводимо введені значення в числа
    const hoursWorked = parseFloat(hours) || 0;
    const minutesWorked = parseFloat(minutes) || 0;
    const ratePerHour = parseFloat(hourlyRate);
    const dollarExchangeRate = parseFloat(exchangeRate);

    // Перевірка на валідність введених даних
    if (isNaN(ratePerHour) || isNaN(dollarExchangeRate)) {
      alert(
        "Будь ласка, введіть коректні числові значення для ставки та курсу!"
      );
      return;
    }

    if (
      hoursWorked < 0 ||
      minutesWorked < 0 ||
      ratePerHour < 0 ||
      dollarExchangeRate < 0
    ) {
      alert("Значення не можуть бути від’ємними!");
      return;
    }

    if (minutesWorked >= 60) {
      alert(
        "Хвилини не можуть бути більше або дорівнювати 60! Переведіть у години."
      );
      return;
    }

    // Переводимо години та хвилини в загальну кількість годин
    const totalHours = hoursWorked + minutesWorked / 60;

    // Розраховуємо зарплату в доларах
    const salaryInDollars = totalHours * ratePerHour;

    // Переводимо зарплату в гривні
    const salaryInHryvnia = salaryInDollars * dollarExchangeRate;

    // Зберігаємо результат
    setResult({
      hours: hoursWorked,
      minutes: minutesWorked,
      dollars: salaryInDollars.toFixed(2),
      hryvnia: salaryInHryvnia.toFixed(2),
    });
  };

  // Функція для очищення полів
  const clearFields = () => {
    setHours("");
    setMinutes("");
    setHourlyRate("");
    setExchangeRate("");
    setResult(null);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Калькулятор зарплати
      </Typography>

      {/* Поле для введення годин */}
      <TextField
        label="Години роботи"
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Поле для введення хвилин */}
      <TextField
        label="Хвилини роботи"
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Поле для введення погодинної ставки */}
      <TextField
        label="Погодинна ставка (долари)"
        type="number"
        step="0.01" // Дозволяємо дробові значення для ставки
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Поле для введення курсу долара */}
      <TextField
        label="Курс долара (до гривні)"
        type="number"
        step="0.01" // Дозволяємо дробові значення для курсу
        value={exchangeRate}
        onChange={(e) => setExchangeRate(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Кнопки для розрахунку та очищення */}
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={calculateSalary}>
          Розрахувати
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearFields}>
          Очистити
        </Button>
      </Box>

      {/* Виведення результату */}
      {result && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Результат:</Typography>
          <Typography>
            Час роботи: {result.hours} год {result.minutes} хв
          </Typography>
          <Typography>Зарплата в доларах: ${result.dollars}</Typography>
          <Typography>Зарплата в гривнях: ₴{result.hryvnia}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SalaryCalculator;
