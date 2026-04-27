import pandas as pd
import matplotlib.pyplot as plt
import urllib.request
import json

url = "http://localhost:3000/inventory"
with urllib.request.urlopen(url) as response:
    inventory = json.loads(response.read())

df = pd.DataFrame(inventory)

# Ensure quantity is numeric for aggregation logic.
df["quantity"] = pd.to_numeric(df["quantity"], errors="coerce").fillna(0).astype(int)

LOW_STOCK_THRESHOLD = 5

total_items = len(df)
low_stock_count = (df["quantity"] <= LOW_STOCK_THRESHOLD).sum()

category_summary = (
    df.groupby("category", as_index=False)
    .agg(
        item_count=("id", "count"),
        total_quantity=("quantity", "sum"),
        avg_quantity=("quantity", "mean"),
    )
    .sort_values("item_count", ascending=False)
)

print("\n=== Inventory Summary ===")
print(f"Total number of items: {total_items}")
print(
    f"Low stock items (quantity <= {LOW_STOCK_THRESHOLD}): {low_stock_count}"
)
print("\nItems grouped by category:")
print(category_summary)

# Simple visualization: count of items by category.
plt.figure(figsize=(8, 4))
plt.bar(category_summary["category"], category_summary["item_count"])
plt.title("Inventory Items by Category")
plt.xlabel("Category")
plt.ylabel("Number of Items")
plt.tight_layout()
plt.savefig("inventory_category_summary.png")

print("\nSaved chart to data_science/inventory_category_summary.png")