# dbms_project
Postgres:

Trigger Procedure :

CREATE OR REPLACE FUNCTION emp.emp_trigger()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin
	insert into emp.emp_log(emp_name,time,is_signed_in,emp_id) values(new.emp_name,current_timestamp,new.is_signed_in,new.id);
	return new;
end;
$BODY$;

ALTER FUNCTION emp.emp_trigger()
    OWNER TO postgres;

Trigger on emp_data : 
CREATE OR REPLACE TRIGGER emp_log
    AFTER INSERT OR UPDATE OF is_signed_in
    ON emp.emp_data
    FOR EACH ROW
    EXECUTE FUNCTION emp.emp_trigger();
