import pandas as pd

def main(sheet):
    excel = pd.read_excel(sheet)
    print(excel)
