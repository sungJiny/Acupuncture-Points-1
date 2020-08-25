import sqlite3

class KMT:
    '''
    Show the Korean Medical Treatment
    '''
    @classmethod
    def search_Food(self, Symptom):

        conn = sqlite3.connect('Acup_last.db')
        cur = conn.cursor()
        cur.execute('''
        SELECT Food_name, How_to_eat
        FROM Food, Symptom
        WHERE Symptom.Symp_name == "'''+str(Symptom)+'''";
        ''')
        res = cur.fetchall()
        return res
    
    @classmethod
    def search_Acup(self, Symptom):
        
        conn = sqlite3.connect('Acup_last.db')
        cur = conn.cursor()
        cur.execute('''
            SELECT Acup_Method.Acup_id
            FROM Acup_Method
            WHERE Acup_Method.Symp_id == (SELECT Symp_id FROM Symptom WHERE Symp_name == "'''
            +str(Symptom)+'''");
            ''')
        res_code_ = cur.fetchall()
        Acup_list = list()
        for i in range(len(res_code_)):
            Acup_list.append(res_code_[i][0])
        
        acup_ = []
        for i in range(len(Acup_list)):
            cur.execute('''
            SELECT Acup.Acup_name, Acup.Acup_position
            FROM Acup
            WHERE Acup_id == "'''+str(Acup_list.pop())+'''";
            ''')
            acup = cur.fetchall()
            acup_.append(acup[0])
        return acup_
############################
KMT.search_Acup('두통')