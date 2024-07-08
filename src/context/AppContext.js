import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const updatedExpenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name) {
                    return {
                        ...currentExp,
                        cost: currentExp.cost + action.payload.cost,
                    };
                }
                return currentExp;
            });
            return {
                ...state,
                expenses: updatedExpenses,
            };
        case 'RED_EXPENSE':
            const reducedExpenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    return {
                        ...currentExp,
                        cost: currentExp.cost - action.payload.cost,
                    };
                }
                return currentExp;
            });
            return {
                ...state,
                expenses: reducedExpenses,
            };
        case 'DELETE_EXPENSE':
            const filteredExpenses = state.expenses.filter(
                (expense) => expense.id !== action.payload
            );
            return {
                ...state,
                expenses: filteredExpenses,
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };
        case 'CHG_CURRENCY':
            return {
                ...state,
                currency: action.payload,
            };
        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const remaining = state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
