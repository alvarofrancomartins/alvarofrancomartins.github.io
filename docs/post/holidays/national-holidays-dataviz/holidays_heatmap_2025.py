import calendar
from collections import Counter

import holidays
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

YEAR = 2025
MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

# UN member states (193) + permanent observers (Holy See, Palestine) = 195.
UN_MEMBERS = {
    "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB",
    "BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH",
    "CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY",
    "CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI",
    "FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU",
    "IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP",
    "KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY",
    "MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM",
    "NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG",
    "PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST",
    "SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD",
    "SR","SE","CH","SY","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV",
    "UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","YE","ZM","ZW",
    "VA","PS",
}

codes = [c for c in holidays.list_supported_countries() if len(c) == 2 and c in UN_MEMBERS]

counts = Counter()
for code in codes:
    try:
        h = holidays.country_holidays(code, years=YEAR)
    except Exception:
        continue
    counts.update({(d.month, d.day) for d in h.keys()})

matrix = np.full((31, 12), np.nan)
for month in range(1, 13):
    for day in range(1, calendar.monthrange(YEAR, month)[1] + 1):
        v = counts.get((month, day), 0)
        matrix[day - 1, month - 1] = v if v > 0 else np.nan  # zero -> blank (white)

df = pd.DataFrame(matrix, index=range(1, 32), columns=MONTHS)

fig, ax = plt.subplots(figsize=(8, 10))
sns.heatmap(
    df, cmap="magma_r", linewidths=1, linecolor="white",
    mask=df.isna(), ax=ax, cbar=False,
)
ax.set_ylabel("")
ax.set_xlabel("")
ax.xaxis.tick_top()
ax.tick_params(axis="x", rotation=0, bottom=False, top=True,
               labelbottom=False, labeltop=True,
               length=0, labelsize=14)
ax.tick_params(axis="y", rotation=0, length=0, labelsize=14)

cmap = plt.get_cmap("magma_r")
vmax = int(np.nanmax(df.values))
for day in range(1, 32):
    for col, month in enumerate(MONTHS):
        v = df.loc[day, month]
        if not np.isnan(v):
            r, g, b, _ = cmap(v / vmax)
            luminance = 0.299 * r + 0.587 * g + 0.114 * b
            color = "white" if luminance < 0.5 else "#2d2d2d"
            ax.text(col + 0.5, day - 0.5, f"{int(v)}",
                    ha="center", va="center", color=color,
                    fontsize=13)

# Horizontal gradient legend below the heatmap ("menos comum" → "mais comum").
fig.subplots_adjust(bottom=0.18, top=0.84)
bbox = ax.get_position()
gap = 0.03        # space between heatmap and the gradient bar
grad_h = 0.02     # height of the gradient bar
grad_bottom = bbox.y0 - gap - grad_h
legend_ax = fig.add_axes([bbox.x0, grad_bottom, bbox.width, grad_h])
grad = np.linspace(0, 1, 256).reshape(1, -1)
legend_ax.imshow(grad, aspect="auto", cmap="magma_r")
legend_ax.set_xticks([])
legend_ax.set_yticks([])
for spine in legend_ax.spines.values():
    spine.set_visible(False)

label_y = grad_bottom - 0.005
fig.text(bbox.x0, label_y, "less common", ha="left", va="top", fontsize=16)
fig.text(bbox.x1, label_y, "more common", ha="right", va="top", fontsize=16)

fig.suptitle(f"Number of countries with a national holiday\n"
             f"on each day of the month ({len(codes)} countries, {YEAR})",
             fontsize=20, y=0.96, fontweight="bold")
plt.savefig("holidays_heatmap_2025.png", dpi=150, bbox_inches="tight")
