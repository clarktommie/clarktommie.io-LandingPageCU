import pandas as pd


COLUMNS = [
    "Credit_Union",
    "City",
    "State",
    "Website",
    "Contact_Name",
    "Role",
    "Email",
    "Outreach_Sent",
    "Response_Status",
    "Follow_Up_Date",
    "Meeting_Scheduled",
    "Landing_Page_Viewed",
    "Priority",
    "Notes",
]


def build_placeholder_rows(count: int = 29):
    rows = []
    for i in range(1, count + 1):
        rows.append(
            {
                "Credit_Union": f"NC Credit Union {i}",
                "City": "",
                "State": "NC",
                "Website": "",
                "Contact_Name": "",
                "Role": "",
                "Email": "",
                "Outreach_Sent": "",
                "Response_Status": "",
                "Follow_Up_Date": "",
                "Meeting_Scheduled": "",
                "Landing_Page_Viewed": "",
                "Priority": "",
                "Notes": "",
            }
        )
    return rows


def main():
    df = pd.DataFrame(build_placeholder_rows(29), columns=COLUMNS)
    df.to_csv("credit_union_outreach_tracker.csv", index=False)
    print("Credit union outreach tracker created successfully.")


if __name__ == "__main__":
    main()
