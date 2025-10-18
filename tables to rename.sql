-- tables to rename
SELECT table_schema, table_name, lower(table_name) AS new_name
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog','information_schema')
  AND table_type = 'BASE TABLE'
  AND table_name <> lower(table_name)
ORDER BY table_schema, table_name;

-- columns to rename
SELECT table_schema, table_name, column_name, lower(column_name) as new_col
FROM information_schema.columns
WHERE table_schema NOT IN ('pg_catalog','information_schema')
  AND column_name <> lower(column_name)
ORDER BY table_schema, table_name;



SELECT format('ALTER TABLE %I.%I RENAME COLUMN %I TO %I;',
              table_schema, table_name, column_name, lower(column_name)) AS sql
FROM information_schema.columns
WHERE table_schema NOT IN ('pg_catalog','information_schema')
  AND column_name <> lower(column_name)
ORDER BY table_schema, table_name;

SELECT format('ALTER TABLE %I.%I RENAME TO %I;',
              table_schema, table_name, lower(table_name)) AS sql
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog','information_schema')
  AND table_type='BASE TABLE'
  AND table_name <> lower(table_name)
ORDER BY table_schema, table_name;



DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT table_schema, table_name, column_name
    FROM information_schema.columns
    WHERE table_schema NOT IN ('pg_catalog','information_schema')
      AND column_name <> lower(column_name)
    ORDER BY table_schema, table_name, ordinal_position
  LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = r.table_schema
        AND table_name = r.table_name
        AND column_name = lower(r.column_name)
    ) THEN
      RAISE NOTICE 'Skipping column %I.%I.%I -> % (target exists)', r.table_schema, r.table_name, r.column_name, lower(r.column_name);
    ELSE
      EXECUTE format('ALTER TABLE %I.%I RENAME COLUMN %I TO %I', r.table_schema, r.table_name, r.column_name, lower(r.column_name));
      RAISE NOTICE 'Renamed column %I.%I.%I -> %', r.table_schema, r.table_name, r.column_name, lower(r.column_name);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;


DO $$
DECLARE
  t RECORD;
BEGIN
  FOR t IN
    SELECT table_schema, table_name, lower(table_name) AS new_name
    FROM information_schema.tables
    WHERE table_schema NOT IN ('pg_catalog','information_schema')
      AND table_type = 'BASE TABLE'
      AND table_name <> lower(table_name)
    ORDER BY table_schema, table_name
  LOOP
    IF to_regclass(t.table_schema || '.' || t.new_name) IS NOT NULL THEN
      RAISE NOTICE 'Skipping table %I.%I -> % (target exists)', t.table_schema, t.table_name, t.new_name;
    ELSE
      EXECUTE format('ALTER TABLE %I.%I RENAME TO %I', t.table_schema, t.table_name, t.new_name);
      RAISE NOTICE 'Renamed table %I.%I -> %', t.table_schema, t.table_name, t.new_name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;



-- tables still mixed-case (need quotes)
SELECT table_schema, table_name FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog','information_schema')
  AND table_type='BASE TABLE'
  AND table_name <> lower(table_name)
ORDER BY table_schema, table_name;

-- columns still mixed-case
SELECT table_schema, table_name, column_name
FROM information_schema.columns
WHERE table_schema NOT IN ('pg_catalog','information_schema')
  AND column_name <> lower(column_name)
ORDER BY table_schema, table_name;



-- show objects that would conflict (target already exists)
SELECT t.table_schema, t.table_name AS old_name, lower(t.table_name) AS new_name,
       to_regclass(t.table_schema || '.' || lower(t.table_name)) AS target_regclass
FROM information_schema.tables t
WHERE t.table_schema NOT IN ('pg_catalog','information_schema')
  AND t.table_type='BASE TABLE'
  AND t.table_name <> lower(t.table_name)
ORDER BY target_regclass DESC, t.table_schema, t.table_name;






cat "/home/dudes/Desktop/free/GvtPtro/reference/potholeBackup2025_sept_5_11_33_am.sql" | sudo -u postgres psql -d devdb