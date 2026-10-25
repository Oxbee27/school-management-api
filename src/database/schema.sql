
-- ============================================
-- SCHOOL MANAGEMENT SYSTEM DATABASE SCHEMA
-- Existing students table and records are kept.
-- ============================================

-- 1. USERS: accounts for admins, teachers, students
-- Create students table if it does not already exist.
-- Existing student tables and records are preserved.
CREATE TABLE IF NOT EXISTS public.students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    admission_number VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. CLASSES
CREATE TABLE IF NOT EXISTS public.classes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Prevent duplicate class names regardless of letter case.
CREATE UNIQUE INDEX IF NOT EXISTS classes_class_name_lower_unique
ON public.classes (LOWER(class_name));

-- 3. EXTEND THE EXISTING STUDENTS TABLE
-- These statements preserve existing student records.
ALTER TABLE public.students
    ALTER COLUMN admission_number TYPE VARCHAR(50),
    ADD COLUMN IF NOT EXISTS user_id INTEGER,
    ADD COLUMN IF NOT EXISTS date_of_birth DATE,
    ADD COLUMN IF NOT EXISTS gender VARCHAR(10),
    ADD COLUMN IF NOT EXISTS class_name VARCHAR(50),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Allow only valid gender values when a value is supplied.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'students_gender_check'
          AND conrelid = 'public.students'::regclass
    ) THEN
        ALTER TABLE public.students
        ADD CONSTRAINT students_gender_check
        CHECK (gender IN ('male', 'female') OR gender IS NULL);
    END IF;
END $$;

-- A user can have at most one student profile.
CREATE UNIQUE INDEX IF NOT EXISTS students_user_id_unique
ON public.students (user_id)
WHERE user_id IS NOT NULL;

-- Link student profiles to user accounts.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'students_user_id_fkey'
          AND conrelid = 'public.students'::regclass
    ) THEN
        ALTER TABLE public.students
        ADD CONSTRAINT students_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT;
    END IF;
END $$;

-- 4. TEACHERS
CREATE TABLE IF NOT EXISTS public.teachers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE
        REFERENCES public.users(id) ON DELETE RESTRICT,
    staff_number VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    qualification VARCHAR(100),
    department VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. SUBJECTS
CREATE TABLE IF NOT EXISTS public.subjects (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(500),
    class_id INTEGER NOT NULL
        REFERENCES public.classes(id) ON DELETE RESTRICT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. RESULTS
CREATE TABLE IF NOT EXISTS public.results (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id INTEGER NOT NULL
        REFERENCES public.students(id) ON DELETE RESTRICT,
    subject_id INTEGER NOT NULL
        REFERENCES public.subjects(id) ON DELETE RESTRICT,
    score NUMERIC(5, 2) NOT NULL CHECK (score >= 0 AND score <= 100),
    grade VARCHAR(2) NOT NULL,
    term VARCHAR(50) NOT NULL,
    session VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, subject_id, term, session)
);

-- 7. Useful indexes for common lookups
CREATE INDEX IF NOT EXISTS students_last_name_idx
ON public.students (last_name);

CREATE INDEX IF NOT EXISTS teachers_user_id_idx
ON public.teachers (user_id);

CREATE INDEX IF NOT EXISTS subjects_class_id_idx
ON public.subjects (class_id);

CREATE INDEX IF NOT EXISTS results_student_id_idx
ON public.results (student_id);

CREATE INDEX IF NOT EXISTS results_subject_id_idx
ON public.results (subject_id);
