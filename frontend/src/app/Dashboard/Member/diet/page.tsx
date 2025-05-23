"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Utensils, Apple, Droplet, Scale } from "lucide-react";

// Mock data for demonstration
const dailyNutrition = {
  calories: {
    target: 2000,
    consumed: 1450,
    remaining: 550,
  },
  macros: {
    protein: { target: 150, consumed: 120, unit: "g" },
    carbs: { target: 250, consumed: 180, unit: "g" },
    fats: { target: 65, consumed: 45, unit: "g" },
  },
  water: {
    target: 8,
    consumed: 5,
    unit: "glasses",
  },
};

const meals = [
  {
    id: 1,
    name: "Breakfast",
    time: "8:00 AM",
    items: [
      { name: "Oatmeal with Berries", calories: 350, protein: "12g" },
      { name: "Greek Yogurt", calories: 150, protein: "15g" },
    ],
  },
  {
    id: 2,
    name: "Lunch",
    time: "12:30 PM",
    items: [
      { name: "Grilled Chicken Salad", calories: 450, protein: "35g" },
      { name: "Whole Grain Bread", calories: 120, protein: "4g" },
    ],
  },
  {
    id: 3,
    name: "Dinner",
    time: "7:00 PM",
    items: [
      { name: "Salmon with Vegetables", calories: 380, protein: "28g" },
      { name: "Brown Rice", calories: 200, protein: "5g" },
    ],
  },
];

export default function DietPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Diet Plan</h2>
          <p className="text-muted-foreground">
            Track your nutrition and meal plans
          </p>
        </div>
        <Button asChild>
          <Link href="/Dashboard/Member/diet/log">
            <Utensils className="mr-2 h-4 w-4" />
            Log Meal
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyNutrition.calories.consumed}</div>
            <p className="text-xs text-muted-foreground">
              {dailyNutrition.calories.remaining} remaining
            </p>
            <Progress
              value={(dailyNutrition.calories.consumed / dailyNutrition.calories.target) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
            <Apple className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyNutrition.macros.protein.consumed}g</div>
            <p className="text-xs text-muted-foreground">
              {dailyNutrition.macros.protein.target}g target
            </p>
            <Progress
              value={(dailyNutrition.macros.protein.consumed / dailyNutrition.macros.protein.target) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyNutrition.water.consumed}</div>
            <p className="text-xs text-muted-foreground">
              {dailyNutrition.water.target} {dailyNutrition.water.unit} target
            </p>
            <Progress
              value={(dailyNutrition.water.consumed / dailyNutrition.water.target) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
          <CardDescription>Track your daily nutrition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {meals.map((meal) => (
              <div key={meal.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Food
                  </Button>
                </div>
                <div className="space-y-2">
                  {meal.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted"
                    >
                      <span>{item.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {item.calories} cal
                        </span>
                        <Badge variant="outline">{item.protein}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 