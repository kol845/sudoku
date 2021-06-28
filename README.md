# Qlik Code Test

## Task description
The task was to create the following Sudoku features:
- Sudoku Board solver
- Sudoku Board difficulty estimator
- Sudoku Board generator

Also create a UI for managing these features.

## How I solved it
I decided to use React Native. I used the *expo tabs (TypeScript) starter*. The starter contained example screens with *react-navigations* and *TypeScript*.

## Unfinished Implementations
Due to the constrained time frame, I was not able to finish this task fully. The features that I missed to implement were:

### **Automated Testing**
The solution lacks automated tests. The logic of the code was tested manualy, which is not optimal. The different validation logics should have their own unit tests to confirm their functionalities.

### **Solution Optimizing**
Trying to solve a difficult board takes a lot of time. The algorithm for solving boards is a non-optimized bruteforce algorithm.

### **Smarter Difficulty Estimation**
The difficulty estimation algorithm is very basic. It just counts all the known squares and gives a difficulty grade based on that.

### **More Consistent and Pleasent Frontend**
The frontend need a lot of polishing. The board is poorly designed and inconsistent.

### **Loading Screens**
The frontend lacks a loading screen to tell the user when loading is occuring.

### **Soduku Board Generation**
I did not have time to implement the logic for generating a new Sudoku board. But this could easily be done with known algorithms.

## How To Run
- Download the repository
- Run:
```cli
npm install
npm start
```
You can use your browser or you own phone to try the app. The app is built with expo.