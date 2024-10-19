"use client";
import React, {useState} from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Divider,
  Chip,
  Tooltip,
  IconButton,
  Link,
} from "@mui/material";
import {Info, Calculate, GitHub} from "@mui/icons-material";
import {add} from "../utils/stringCalculator";
import {EXAMPLES, RESULT, STRING_CALCULATOR} from "../constants/constants";
import ResultAlert from "./ResultAlert";

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      const calculatedResult = add(input);
      setResult(calculatedResult);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setResult(null);
    setError(null);
  };

  const examples = [
    {input: "1,2,3", description: "Simple comma-separated"},
    {input: "1,-2,-3", description: "Negative Numbers"},
    {input: "1\n2,3", description: "Using newline"},
    {input: "//;\n1;2;3", description: "Custom delimiter"},
  ];

  const handleExampleClick = (exampleInput: string) => {
    setInput(exampleInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCalculate();
    }
  };

  return (
    <Paper elevation={3} sx={{maxWidth: 400, mx: "auto", mt: 4, p: 2}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">
          {STRING_CALCULATOR}
          <Tooltip title="Enter numbers separated by commas or new lines. You can also use custom delimiters with //[delimiter]\n format">
            <IconButton size="small" sx={{ml: 1}}>
              <Info />
            </IconButton>
          </Tooltip>
        </Typography>
        <Link
          href="https://github.com/Chaitanya1672/incubyte-string-calculator"
          target="_blank"
          rel="noopener"
        >
          <IconButton
            color="primary"
            aria-label="GitHub Profile"
            title="Chaitanya Github"
          >
            <GitHub fontSize="large" color="action" />
          </IconButton>
        </Link>
      </Box>
      <Divider sx={{mb: 4}} />

      <Box sx={{mb: 3}}>
        <Typography variant="subtitle1" gutterBottom>
          {EXAMPLES}:
        </Typography>
        <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
          {examples.map((example, index) => (
            <Tooltip key={index} title={example.description}>
              <Chip
                label={example.input}
                onClick={() => handleExampleClick(example.input)}
                clickable
                color="primary"
                variant="outlined"
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      <Box sx={{mb: 2}}>
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          label="Enter numbers"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter numbers (e.g., 1,2,3 or //;\n1;2;3)"
          onKeyDown={handleKeyPress}
          sx={{mb: 2}}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleCalculate}
            color="primary"
            size="large"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            title="Calculate Result"
          >
            <Calculate />
          </IconButton>
        </Box>
      </Box>

      {result !== null && (
        <ResultAlert type="success" message={`${RESULT}: ${result}`} />
      )}

      {error && <ResultAlert type="error" message={error} />}
    </Paper>
  );
};

export default StringCalculator;
